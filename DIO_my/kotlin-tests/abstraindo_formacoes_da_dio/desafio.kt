enum class Nivel { BASICO, INTERMEDIARIO, AVANCADO }

data class Usuario(
    val name: String,
    val area: String,
)

data class ConteudoEducacional(
    val nome: String,
    var duracao: Int,
    var nivel: Nivel
)

data class Formacao(
    val nome: String,
    var conteudos: List<ConteudoEducacional>
) {
    val inscritos = mutableListOf<Usuario>()
    
    fun matricular(vararg usuarios: Usuario) {
        inscritos.addAll(usuarios)
    }
}

fun main() {
    val ConteudoEdu1 = ConteudoEducacional("Front-end", 55, Nivel.BASICO )
    val ConteudoEdu2 = ConteudoEducacional("Front-end", 30, Nivel.INTERMEDIARIO )
    val ConteudoEdu3 = ConteudoEducacional("Front-end", 60, Nivel.AVANCADO )

    val frontEndtraining = Formacao("FrontEnd", listOf(ConteudoEdu1, ConteudoEdu2, ConteudoEdu3))

    val user1 = Usuario("joana", "frontend")
    val user2 = Usuario("Maria", "UX/UI")
    val user3 = Usuario("Pedro", "frontend")
    val user4 = Usuario("Gustavo", "frontend")
    val user5 = Usuario("Olivia", "backend")

    println("Inscritos: ${frontEndtraining.inscritos}")

    frontEndtraining.matricular(user1, user2, user3, user4)
    println("----------------")
    println("Inscritos: ${frontEndtraining.inscritos}")

    frontEndtraining.matricular(user5)
    println("----------------")
    println("Inscritos: ${frontEndtraining.inscritos}")
    println("----------------")
    println("--------ALUNOS FORMACAO FRONTEND--------")
    frontEndtraining.inscritos.forEach{
        it ->
            println("----------------------------") 
            println("Nome: ${it.name}")
            println("Area de atuacao: ${it.area}")
            println("----------------------------")
        
    }
}