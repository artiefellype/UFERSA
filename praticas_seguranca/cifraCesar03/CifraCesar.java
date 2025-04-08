package cifraCesar03;

public class CifraCesar {
    public static String cifrar(String textoAberto, int chave) {
        String codificado = "";

        for(int i = 0; i < textoAberto.length(); i++){
            codificado += (char) (textoAberto.charAt(i) + chave);
        }

        return codificado;
    }

    public static String decifrar(String codificado, int chave){
        String textoAberto = "";

        for(int i = 0; i < codificado.length(); i++){
            textoAberto += (char) (codificado.charAt(i) - chave);
        }

        return textoAberto;
    }
}
