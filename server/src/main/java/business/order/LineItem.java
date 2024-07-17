package business.order;

public record LineItem(long orderId, long bookId, int quantity) {}
