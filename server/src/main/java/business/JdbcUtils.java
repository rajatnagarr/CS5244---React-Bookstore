package business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import business.BookstoreDbException.BookstoreConnectionDbException;

@Component
public class JdbcUtils {

    private static final String JDBC_BOOKSTORE = "jdbc/RajatBookstore";

    private static DataSource dataSource;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        JdbcUtils.dataSource = dataSource;
    }

    public static Connection getConnection() {
        try {
            System.out.println("JdbcUtils.getConnection() called");
            if (dataSource == null) {
                System.out.println("dataSource is null, falling back to JNDI lookup");
                // Fall back to JNDI lookup if DataSource is not injected
                dataSource = getDataSource(JDBC_BOOKSTORE);
            }
            System.out.println("Getting connection from dataSource");
            return dataSource.getConnection();
        } catch (SQLException e) {
            throw new BookstoreConnectionDbException("Encountered a SQL issue getting a connection", e);
        }
    }

    private static DataSource getDataSource(String dataSourceName) {
        try {
            InitialContext initialContext = new InitialContext();
            Context context = (Context) initialContext.lookup("java:comp/env");
            return (DataSource) context.lookup(dataSourceName);
        } catch (NamingException e) {
            throw new IllegalArgumentException("Encountered an issue establishing an initial JNDI context", e);
        }
    }
}
