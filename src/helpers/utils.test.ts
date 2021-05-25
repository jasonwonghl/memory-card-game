import { arrayEquals, generateRandomNumberArray, shuffleArray } from 'helpers/utils'
import { CARD_PAIRS_VALUE, MAX } from 'view/game/GameScreen'

describe('Helpers', () => { 
  let randomNumberArr:number[] = []
  
  beforeEach(() => {
    randomNumberArr = generateRandomNumberArray(CARD_PAIRS_VALUE, MAX)
  })
    
  describe('Random number array', () => {
    it('should generate a random number array with a length specified by the count argument', () => {
      expect(randomNumberArr.length).toEqual(CARD_PAIRS_VALUE)
    })

    it('should contain only unique numbers', () => {
      const hasDuplicates = new Set(randomNumberArr).size !== randomNumberArr.length

      expect(hasDuplicates).toBeFalsy()
    })

    it('should have only values between 1 and MAX', () => {
      let outsideRange = false
      for(let val of randomNumberArr) {
        if(val === 0 || val > MAX) {
          outsideRange = true
          break
        }
      }
      expect(outsideRange).toBeFalsy()
    })
  })

  describe('Shuffle array', () => {
    it('should shuffle the positions of the values of an array', () => {
      const concatArr = randomNumberArr.concat(randomNumberArr)
      const shuffledArr = shuffleArray(concatArr)

      expect(arrayEquals(concatArr, shuffledArr)).toBeFalsy()

    })
  })
})
