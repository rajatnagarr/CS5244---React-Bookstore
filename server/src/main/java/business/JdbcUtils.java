package business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import business.BookstoreDbException.BookstoreConnectionDbException;

@Component
public class JdbcUtils {
    private static DataSource dataSource;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        JdbcUtils.dataSource = dataSource;
    }

    public static Connection getConnection() {
        try {
            System.out.println("JdbcUtils.getConnection() called");
            if (dataSource == null) {
                throw new BookstoreConnectionDbException("DataSource is not initialized", null);
            }
            System.out.println("Getting connection from dataSource");
            return dataSource.getConnection();
        } catch (SQLException e) {
            throw new BookstoreConnectionDbException("Encountered a SQL issue getting a connection", e);
        }
    }
}
