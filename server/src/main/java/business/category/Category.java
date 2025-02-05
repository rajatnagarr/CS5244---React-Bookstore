
package business.category;

public record Category(long categoryId, String name) {
    @Override
    public long categoryId() {
        return categoryId;
    }

    @Override
    public String toString() {
        return "Category{" +
                "categoryId=" + categoryId +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public String name() {
        return name;
    }
}
