package cifraCesar03;
//Esse aceita acentuacao
public class TesteCifraCesar {
    public static void main(String[] args) {
        String texto = "Segurançá";
        byte chave = 3;

        String cifrado = CifraCesar.cifrar(texto, chave);
        System.out.println(cifrado);

        texto = CifraCesar.decifrar(cifrado, chave);
        System.out.println(texto);
    }
}
