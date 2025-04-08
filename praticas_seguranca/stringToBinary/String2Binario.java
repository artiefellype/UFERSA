package stringToBinary;

public class String2Binario {
   public static String string2Binario(String string) {
         StringBuilder resultadoBinario = new StringBuilder();

        for(char caractere : string.toCharArray()){
            String charBinario = String.format("%8s", Integer.toBinaryString(caractere)).replace(' ', '0');

            resultadoBinario.append(charBinario).append(" ");
        }    
        return resultadoBinario.toString();
   }

   public static void main(String[] args) {
    String mensagem = "Segurança";

    String binarioMensagem = string2Binario(mensagem);
    System.out.println("Representacao binaria: " + binarioMensagem);
   }
}
