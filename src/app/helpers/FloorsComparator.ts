import { FloorInfo } from 'Http/controllers/vacant/FloorsController'

type Comparator = (a: FloorInfo, b: FloorInfo) => number

export default class FloorsComparator {
  /**
   * Compare by floor number string.
   * Return compare result as descending order.
   */
  public static comparator(): Comparator {
    return (a, b): number => {
      const numA = this.floorToNumber(a.number)
      const numB = this.floorToNumber(b.number)

      return numA > numB ? -1 : numA < numB ? 1 : 0
    }
  }

  /**
   * Convert floor string to number.
   * ex) `B3` -> `-3`
   *
   * @param floor
   */
  private static floorToNumber(floor: string): number {
    // check if basement floor
    if (floor.substring(0, 1).toLowerCase() === 'b') {
      return -parseInt(floor.substring(1))
    } else {
      return parseInt(floor)
    }
  }
}
