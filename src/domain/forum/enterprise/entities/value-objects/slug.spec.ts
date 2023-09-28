import { expect, test } from 'vitest'
import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('An exemplar slug')

  expect(slug.value).toEqual('an-exemplar-slug')
})
