package cifraFeistel;

public class TesteCifraFeistel {
    public static void main(String[] args) {
        String mensagem = "0001101100010010";
        String[] chaves =  {"10111011", "01011010", "11001001", "00110110"};

        
        System.out.println("Mensagem original: " + mensagem);
        // Cifrar a mensagem
        String cifrada = CifraFeistel.cifrar(mensagem, chaves);
        System.out.println("Mensagem cifrada: " + cifrada);
        // Decifrar a mensagem
        String decifrada = CifraFeistel.decifrar(cifrada, chaves);
        System.out.println("Mensagem decifrada: " + decifrada);
    }
}
