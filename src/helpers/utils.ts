/**
 * Generates an array of random numbers
 * @param count The number of values to generate
 * @param max The max range of allowed values from 1 to {max}
 * @returns {number[]} Returns the randomly generated array
 */
export const generateRandomNumberArray = (count: number, max: number) => {
  const array: any[ ]= []
  while(array.length < count) {
    const val = Math.floor(Math.random() *  max) +1
    if(!array.includes(val)) array.push(val)
  }

  return array
}

/**
 * Shuffles the list of array values using the Durstenfeld algorithm
 * @param array the list of values to be shuffled
 * @returns {any[]} The shuffled array
 */
 export const shuffleArray = (array: number[]) => {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}