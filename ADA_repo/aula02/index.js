const divDeTeste = document.getElementById("teste")
divDeTeste.innerHTML = "<p>testado</p>";

// Questao 1 Formatacao de data para formato 24 hrs

const hour = "06:39:34PM";
const formatHour = (hour) => {
  let hourFormatted;
  const hourArray = hour.split(":");
  let hours = hourArray[0];
  const min = hourArray[1];

  const isDay = hourArray[2].charAt(2) == "A";
  const sec = isDay ? hourArray[2].split("A")[0] : hourArray[2].split("P")[0];

  //   console.log(hours, " ",min, " ",sec, " ", isDay )
  //   console.log((hours % 12) + 12)

  if (!isDay) hours = (hours % 12) + 12;

  return `${hours}:${min}:${sec}`;
};

console.log("Questão 1:", formatHour("06:15:25PM"));

// Questão 2 Encontrar quantidade de palavras
const palavra =
  "façaMercadoNoIfoodEntregamosTudoOQueVocêPrecisaNaPortaDaSuaCasa";

const quantityOfWords = (word) => {
  let wordsCount = 1;
  for (let i = 0; i < word.length; i++) {
    // Considerando letras soltas como palavras
    if (word.charAt(i) == word.charAt(i).toUpperCase()) wordsCount++;
  }

  if (word.length == 0) return 0;

  return wordsCount;
};

console.log( "Questao 2: ", quantityOfWords(palavra))

// Questão 3 Encontrar numeros que nao se repetem
const arrayDeNumeros = [12, 17, 15, 19, 22, 17, 19, 12];
function findRepeatNumbers(numbers) {
  let numbersWithoutRepeat = [];
  let numbersRepeat = [];

  numbers.map((item) => {
    if (numbersWithoutRepeat.includes(item)) numbersRepeat.push(item);
    else numbersWithoutRepeat.push(item);
  });

  return numbersRepeat;
}

console.log("Questão 3: ", findRepeatNumbers(arrayDeNumeros))

// Questão 4 - Resposta: E

// Questão 5 - Resposta: A

// Questão 6 - Resposta: B
