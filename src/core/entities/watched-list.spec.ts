import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('Watched List', () => {
  it('should be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3, 4, 5])
    expect(list.getItems()).toHaveLength(5)
  })

  it('should be able to add new item  to the list', () => {
    const list = new NumberWatchedList([1, 2, 3, 4, 5])
    list.add(6)
    expect(list.currentItems).toHaveLength(6)
    expect(list.currentItems).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('should be able to remove an item to the list', () => {
    const list = new NumberWatchedList([1, 2, 3, 4, 5])
    list.remove(1)
    expect(list.getItems()).toHaveLength(4)
    expect(list.currentItems).toEqual([2, 3, 4, 5])
  })

  it('should be able to add an item even if it was removed before', () => {
    const list = new NumberWatchedList([1, 2, 3])
    list.remove(2)
    list.add(2)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toHaveLength(0)
    expect(list.getNewItems()).toHaveLength(0)
  })

  it('should be able to update whatchd list items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.update([1, 3, 5])

    expect(list.getRemovedItems()).toEqual([2])
    expect(list.getNewItems()).toEqual([5])
  })
})
