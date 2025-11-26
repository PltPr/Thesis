public class Main {
    public static void main(String[] args) {
        int limit = 6;

        if (limit > 0) {
            for (int i = 1; i <= limit; i++) {
                System.out.println(i);
            }
        } else {
            System.out.println("Limit musi być większy od zera.");
        }
    }
}
