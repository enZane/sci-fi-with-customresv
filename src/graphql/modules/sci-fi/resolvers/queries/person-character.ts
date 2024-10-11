import type { ResolverProps } from '@composabase/sdk'
import { extractFragment } from '@composabase/sdk'
import { gql, client } from '@composabase/client'

export default async function Resolver({ operation }: ResolverProps) {
  const personFragment = extractFragment(operation.selectionSet.typed, 'Person')
  const characterFragment = extractFragment(operation.selectionSet.typed, 'Character')

  const query = gql(`
    ${personFragment}
    ${characterFragment}
    query findPersonAndCharacter {
      swapi_subgraph {
        allPeople (first: 20) {
          people {
            ...PersonFragment
          }
        }
      }
      rick_morty_subgraph {
        characters {
          results {
            ...CharacterFragment
          }
        }
      }
    }
`)

  const { data, error } = await client.query(query, {});

  if (error) {
    throw error
  }

  if (!data) {
    return []
  }

  const { swapi_subgraph: { allPeople: { people } }, rick_morty_subgraph: { characters: { results } } } = data

  return [...people, ...results]
}
