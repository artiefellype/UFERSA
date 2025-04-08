package cifraVernam;

public class TesteCifraVernam {
    public static void main(String[] args) {
        String mensagemOriginal = "Segurança da Informação";
        String chave = "chavesecreta";

        String mensagemCifrada = CifraVernam.cifrar(mensagemOriginal, chave);
        System.out.println("Mensagem cifrada: " + mensagemCifrada);


        String mensagemDecifrada = CifraVernam.decifrar(mensagemCifrada, chave);
        System.out.println("Mensagem decifrada: " + mensagemDecifrada);
    }
}
