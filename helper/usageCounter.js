import dayjs from 'dayjs';
import fs from "node:fs"

export class UsageCounter {
    // Current Usage
    #gpt3Usage
    #gpt4Usage
    #dalleUsage
    #dalleUsageLars
    #date

    gpt3UsageLimit
    gpt4UsageLimit
    dalleUsageLimit

  /**
   * Resets the usage if a new day startet
   */
  #checkDate() {
    if (dayjs().isAfter(this.#date, "day")) {
      // New Day
      this.#date = dayjs()
      this.#gpt3Usage = 0
      this.#gpt4Usage = 0
      this.#dalleUsage = 0
    } 
  }

  /**
   * Initializes the UsageCounter
   * @param {number} gpt3UsageLimit 
   * @param {number} gpt4UsageLimit 
   * @param {number} dalleUsageLimit 
   */
  constructor(gpt3UsageLimit, gpt4UsageLimit, dalleUsageLimit) {
    this.gpt3UsageLimit = gpt3UsageLimit
    this.gpt4UsageLimit = gpt4UsageLimit
    this.dalleUsageLimit = dalleUsageLimit
    this.date = dayjs()

    const json = fs.readFileSync("./usage.json", "utf-8");
    const obj = JSON.parse(json)
  
    this.#gpt3Usage = obj.gpt3Usage
    this.#gpt4Usage = obj.gpt4Usage
    this.#dalleUsage = obj.dalleUsage
  }

  /**
   * Saves current usage to a json file
   */
  #save() {
    const obj = {
      gpt3Usage: this.#gpt3Usage,
      gpt4Usage: this.#gpt4Usage,
      dalleUsage: this.#dalleUsage,
      dalleUsageLars: this.#dalleUsageLars
    }

    fs.writeFileSync("./usage.json", JSON.stringify(obj))
  }

  /**
   * Returns usage or false if limits exceded
   * Adds to current usage
   * @returns {number | false} 
   */
  get gpt3Usage () {
    this.#checkDate()
    this.#gpt3Usage += 1

    this.#save()

    if (this.#gpt3Usage > this.gpt3UsageLimit) return false
    return this.#gpt3Usage;
  }

  /**
   * Returns usage or false if limits exceded
   * Adds to current usage
   * @returns {number | false} 
   */
  get gpt4Usage () {
    this.#checkDate()
    this.#gpt4Usage += 1

    this.#save()

    if (this.#gpt4Usage > this.gpt4UsageLimit) return false
    return this.#gpt4Usage;
  }

  /**
   * Returns usage or false if limits exceded
   * Adds to current usage
   * @returns {number | false} 
   */
  get dalleUsage () {
    this.#checkDate()
    this.#dalleUsage += 1

    this.#save()

    if (this.#dalleUsage > this.dalleUsageLimit) return false
    return this.#dalleUsage;
  }

  /**
   * Returns usage or false if limits exceded
   * Adds to current usage
   * @returns {number | false} 
   */
  get dalleUsageLars () {
    this.#dalleUsageLars += 1

    this.#save()

    return this.#dalleUsageLars;
  }

 /**
  * Returns usage without adding to it
  * @returns {{gpt3Usage: number, gpt4Usage: number, dallEUsage: number}} 
  */
  get usage () {
    return {
      gpt3Usage: this.#gpt3Usage,
      gpt4Usage: this.#gpt4Usage,
      dallEUsage: this.#dalleUsage,
    }  
  }

}
