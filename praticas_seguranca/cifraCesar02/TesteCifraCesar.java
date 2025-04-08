package cifraCesar02;

public class TesteCifraCesar {
    public static void main(String[] args) {
        String mensagemOriginal = "Ola, mundo!";
        int chave = 3;

        String mensagemCifrada = CifraCesar.cifrar(mensagemOriginal, chave);
        System.out.println("Mensagem cifrada: " + mensagemCifrada);

        String mensagemDecifrada = CifraCesar.decifrar(mensagemCifrada, chave);
        System.out.println("Mensagem decifrada: " + mensagemDecifrada);
    }
}