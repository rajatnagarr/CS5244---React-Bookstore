package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;
	private OrderDao orderDao;
	private Random random = new Random();
	private static final int MIN_LENGTH = 4;
	private static final int MAX_LENGTH = 45;
	private static final int PHONE_LENGTH = 10;
	private static final int MIN_CC_LENGTH = 14;
	private static final int MAX_CC_LENGTH = 16;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}

	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.collect(Collectors.toList());
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private int generateConfirmationNumber() {
		return random.nextInt(999999999);
	}

	private Date getCardExpirationDate(String monthString, String yearString) {
		int month = Integer.parseInt(monthString);
		int year = Integer.parseInt(yearString);
		Date date = new GregorianCalendar(year, month - 1, 01).getTime();
		return date;
	}


	private void validateCustomer(CustomerForm customerForm) {

		String name = customerForm.getName();
		if (nameIsInvalid(name)) {
			throw new ApiException.ValidationFailure("name", "Invalid name field.");
		}
		String address = customerForm.getAddress();
		if (addressIsInvalid(address)) {
			throw new ApiException.ValidationFailure("address", "Invalid address field.");
		}
		String phone = customerForm.getPhone();
		if (phoneIsInvalid(phone)) {
			throw new ApiException.ValidationFailure("phone", "Invalid phone field.");
		}
		String email = customerForm.getEmail();
		if (emailIsInvalid(email)) {
			throw new ApiException.ValidationFailure("email", "Invalid email field.");
		}
		String ccNumber = customerForm.getCcNumber();
		if (ccNumber == null || ccNumber.trim().isEmpty()) {
			throw new ApiException.ValidationFailure("ccNumber", "Credit card number must not be empty.");
		}
		ccNumber = ccNumber.replaceAll("[\\s-]", "");
		if (ccIsInvalid(ccNumber)) {
			throw new ApiException.ValidationFailure("ccNumber", "Invalid credit card number field.");
		}
		String ccExpiryMonth = customerForm.getCcExpiryMonth();
		String ccExpiryYear = customerForm.getCcExpiryYear();
		if (expiryDateIsInvalid(ccExpiryMonth, ccExpiryYear)) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date.");
		}
	}

	private boolean isStringInvalid(String value, int minLength, int maxLength) {
		return value == null || value.isEmpty() || value.length() < minLength || value.length() > maxLength;
	}

	private boolean isPhoneNumberInvalid(String phone) {
		if (phone == null || phone.isEmpty()) {
			return true;
		}
		String sanitizedPhone = phone.replaceAll("[\\-()\\s]", "");
		return sanitizedPhone.length() != PHONE_LENGTH;
	}

	private boolean isEmailInvalid(String email) {
		return email == null || email.isEmpty() || !email.contains("@") || email.contains(" ") || email.endsWith(".");
	}

	private boolean isCreditCardNumberInvalid(String cc) {
		if (cc == null || cc.isEmpty()) {
			return true;
		}
		String sanitizedCC = cc.replaceAll("[\\-\\s]", "");
		return sanitizedCC.length() < MIN_CC_LENGTH || sanitizedCC.length() > MAX_CC_LENGTH;
	}

	private boolean isExpiryDateInvalid(String ccExpiryMonth, String ccExpiryYear) {
		try {
			YearMonth currentYearMonth = YearMonth.now();
			YearMonth expiryYearMonth = YearMonth.of(Integer.parseInt(ccExpiryYear), Integer.parseInt(ccExpiryMonth));
			if (expiryYearMonth.isBefore(currentYearMonth)) {
				throw new ApiException.ValidationFailure("expDate", "Invalid credit card expiry date.");
			}
			return false;
		} catch (NumberFormatException | DateTimeException e) {
			throw new ApiException.ValidationFailure("expDate", "Invalid credit card expiry format.");
		}
	}

	public boolean nameIsInvalid(String name) {
		return isStringInvalid(name, MIN_LENGTH, MAX_LENGTH);
	}

	public boolean addressIsInvalid(String address) {
		return isStringInvalid(address, MIN_LENGTH, MAX_LENGTH);
	}

	public boolean phoneIsInvalid(String phone) {
		return isPhoneNumberInvalid(phone);
	}

	public boolean emailIsInvalid(String email) {
		return isEmailInvalid(email);
	}

	public boolean ccIsInvalid(String cc) {
		return isCreditCardNumberInvalid(cc);
	}

	public boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {
		return isExpiryDateInvalid(ccExpiryMonth, ccExpiryYear);
	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems() == null || cart.getItems().equals("") || cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}
		cart.getItems().forEach(item -> {
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity.");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (item.getBookForm().getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure("Book price does not match.");
			}
			if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("Book category Id does not match.");
			}
		});
	}

}
