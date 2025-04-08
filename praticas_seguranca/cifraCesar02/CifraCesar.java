package cifraCesar02;

public class CifraCesar {
    public static String cifrar(String mensagem, int chave){
        StringBuilder resultado = new StringBuilder();

        for(char caractere: mensagem.toCharArray()){
            if(Character.isLetter(caractere)) {
                char inicioAlfabeto = Character.isUpperCase(caractere) ? 'A' : 'a';

                char cifrado = (char) ((caractere - inicioAlfabeto + chave) % 26 + inicioAlfabeto);

                resultado.append(cifrado);
            } else {
                resultado.append(caractere);
            }
        }

        return resultado.toString();
    }


    public static String decifrar ( String mensagemCifrada, int chave){
        return cifrar(mensagemCifrada, 26 - chave);
    }
}
