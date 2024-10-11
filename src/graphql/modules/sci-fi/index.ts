import { createModule } from "@composabase/sdk"

const scifi = () => {
  const module = createModule('sci-fi')

  module.union('PeopleCharacterUnion', ['swapi_Person', 'rick_morty_Character'])

  module.query('findPersonAndCharacter', {
    definition: {
      type: module.list(module.union('PeopleCharacterUnion')).optional(),
    },
    resolver: 'person-character',
  })

  return module
}

export default scifi()