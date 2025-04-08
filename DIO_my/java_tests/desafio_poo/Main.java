package java_tests.desafio_poo;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        Curso curso1 = new Curso();
        Curso curso2 = new Curso();
        Mentoria mentoria = new Mentoria();

        curso1.setTitulo("Curso de kotlin");
        curso1.setDescricao("descricao dele");
        curso1.setCargaHoraria(60);

        
        curso2.setTitulo("Curso de typescript");
        curso2.setDescricao("descricao dele 2");
        curso2.setCargaHoraria(30);

        mentoria.setTitulo("Mentoria de java");
        mentoria.setDescricao("descricao da mentoria de java");
        mentoria.setData(LocalDate.now());

        // System.out.println(curso1);
        // System.out.println(curso2);

        // System.out.println(mentoria);

        System.out.println("------------------------------");

        Bootcamp bootcamp = new Bootcamp();
        bootcamp.setNome("Java developer");
        bootcamp.setDescricao("Descricao 1");
        bootcamp.getConteudos().add(curso1);
        bootcamp.getConteudos().add(curso2);
        bootcamp.getConteudos().add(mentoria);


        Dev devart = new Dev();
        devart.setNome("artie");
        devart.inscreverBootcamp(bootcamp);
        System.out.println(" artie Conteudos inscritos: " + devart.getConteudosInscritos());

        System.out.println("XP: " + devart.calcularTotalXp());
        devart.progredir();
        
        System.out.println("------------------------------");


        System.out.println(" artie Conteudos inscritos: " + devart.getConteudosInscritos());
        System.out.println(" artie Conteudos concluidos: " + devart.getConteudosConcluidos());
        System.out.println("XP: " + devart.calcularTotalXp());

        Dev devfel = new Dev();
        devfel.setNome("fellype");
        devfel.inscreverBootcamp(bootcamp);
        System.out.println(" fel Conteudos inscritos: " + devfel.getConteudosInscritos());

         System.out.println("XP: " + devfel.calcularTotalXp());
        devfel.progredir();
       
        System.out.println("------------------------------");

        System.out.println(" fel Conteudos inscritos: " + devfel.getConteudosInscritos());
        System.out.println(" fel Conteudos concluidos: " + devfel.getConteudosConcluidos());




    }

    
}
