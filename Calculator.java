import java.util.Scanner;

public class Calculator {
    
    public static double add(double num1, double num2) {
        return num1 + num2;
    }
    
    public static double subtract(double num1, double num2) {
        return num1 - num2;
    }
    
    public static double multiply(double num1, double num2) {
        return num1 * num2;
    }
    
    public static double divide(double num1, double num2) {
        if (num2 == 0) {
            throw new ArithmeticException("لا يمكن القسمة على صفر!");
        }
        return num1 / num2;
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean continueCalculating = true;
        
        System.out.println("=================================");
        System.out.println("    مرحباً بك في الآلة الحاسبة    ");
        System.out.println("=================================");
        
        while (continueCalculating) {
            try {
                System.out.println("\nاختر العملية:");
                System.out.println("1. الجمع (+)");
                System.out.println("2. الطرح (-)");
                System.out.println("3. الضرب (×)");
                System.out.println("4. القسمة (÷)");
                System.out.println("5. الخروج");
                System.out.print("\nاختيارك: ");
                
                int choice = scanner.nextInt();
                
                if (choice == 5) {
                    System.out.println("\nشكراً لاستخدامك الآلة الحاسبة!");
                    continueCalculating = false;
                    continue;
                }
                
                if (choice < 1 || choice > 5) {
                    System.out.println("اختيار غير صحيح! الرجاء اختيار رقم من 1 إلى 5.");
                    continue;
                }
                
                System.out.print("أدخل الرقم الأول: ");
                double num1 = scanner.nextDouble();
                
                System.out.print("أدخل الرقم الثاني: ");
                double num2 = scanner.nextDouble();
                
                double result = 0;
                String operation = "";
                
                switch (choice) {
                    case 1:
                        result = add(num1, num2);
                        operation = "+";
                        break;
                    case 2:
                        result = subtract(num1, num2);
                        operation = "-";
                        break;
                    case 3:
                        result = multiply(num1, num2);
                        operation = "×";
                        break;
                    case 4:
                        result = divide(num1, num2);
                        operation = "÷";
                        break;
                }
                
                System.out.println("\n---------------------------------");
                System.out.println("النتيجة: " + num1 + " " + operation + " " + num2 + " = " + result);
                System.out.println("---------------------------------");
                
            } catch (ArithmeticException e) {
                System.out.println("\nخطأ: " + e.getMessage());
            } catch (Exception e) {
                System.out.println("\nخطأ: الرجاء إدخال قيمة صحيحة!");
                scanner.nextLine();
            }
        }
        
        scanner.close();
    }
}
