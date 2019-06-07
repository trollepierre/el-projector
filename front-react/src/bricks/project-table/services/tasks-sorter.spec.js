import tasksSorter from './tasks-sorter'

describe.skip('tasksSorter', () => {
  describe('next', () => {
    it('should manage four elements', () => {
      const tasks = [
        {
          'firstName': 'Odile',
          'next': '05/11/2016',
        },
        {
          'firstName': 'Julien',
          'next': '23/03/2016',
        },
        {
          'firstName': 'Benoit',
          'next': '20/11/2015',
        },
        {
          'firstName': 'Audrey',
          'next': '24/01/2016',
        },
      ]

      // When
      const response = tasksSorter.next(tasks)

      // Then
      expect(response).toEqual([
          {
            'firstName': 'Benoit',
            'next': '20/11/2015',
          },
          {
            'firstName': 'Audrey',
            'next': '24/01/2016',
          },
          {
            'firstName': 'Julien',
            'next': '23/03/2016',
          },
          {
            'firstName': 'Odile',
            'next': '05/11/2016',
          },
        ]
      )
    })

    it('should not confused day and month', () => {
      const tasks = [
        {
          'firstName': 'Julien',
          'next': '23/03/2016',
        },

        {
          'firstName': 'Audrey',
          'next': '24/01/2016',
        },
      ]

      // When
      const response = tasksSorter.next(tasks)

      // Then
      expect(response).toEqual([
          { 'firstName': 'Audrey', 'next': '24/01/2016' },
          { 'firstName': 'Julien', 'next': '23/03/2016' },
        ]
      )
    })

    it('should return response data', () => {
      const tasks = [
        {
          'firstName': 'Julien',
          'lastName': 'Michard',
          'next': '23/03/2016',
        },
        {
          'firstName': 'Ibai',
          'lastName': '',
          'next': '',
        },
      ]

      // When
      const response = tasksSorter.next(tasks)

      // Then
      expect(response).toEqual([
          { 'firstName': 'Julien', 'lastName': 'Michard', 'next': '23/03/2016' },
          { 'firstName': 'Ibai', 'lastName': '', 'next': '' },
        ]
      )
    })
  })

  describe('firstName', () => {
    it('should manage four elements', () => {
      const tasks = [
        {
          'firstName': 'Odile',
          'lastName': 'Aristaghes',
        },
        {
          'firstName': 'Odile',
          'lastName': 'Michard',
        },
        {
          'firstName': 'Benoît',
          'lastName': 'Lefebvre',
        },
        {
          'firstName': 'Audrey',
          'lastName': 'Boulard',
        },
        {
          firstName: 'Etienne',
          lastName: 'De Valmont',
        },
      ]

      // When
      const response = tasksSorter.firstName(tasks)

      // Then
      expect(response).toEqual([
          {
            'firstName': 'Audrey',
            'lastName': 'Boulard',
          },
          {
            'firstName': 'Benoît',
            'lastName': 'Lefebvre',
          },
          {
            firstName: 'Etienne',
            lastName: 'De Valmont',
          },
          {
            'firstName': 'Odile',
            'lastName': 'Aristaghes',
          },
          {
            'firstName': 'Odile',
            'lastName': 'Michard',
          },
        ]
      )
    })
  })

  describe('lastName', () => {
    it('should manage four elements', () => {
      const tasks = [
        {
          'firstName': 'Odile',
          'lastName': 'Aristaghes',
        },
        {
          'firstName': 'Thibaut',
          'lastName': 'Boulard',
        },
        {
          'firstName': 'Benoît',
          'lastName': 'Lefebvre',
        },
        {
          'firstName': 'Audrey',
          'lastName': 'Boulard',
        },
        {
          firstName: 'Etienne',
          lastName: 'De Valmont',
        },
      ]

      // When
      const response = tasksSorter.lastName(tasks)

      // Then
      expect(response).toEqual([
          {
            'firstName': 'Odile',
            'lastName': 'Aristaghes',
          },
          {
            'firstName': 'Audrey',
            'lastName': 'Boulard',
          },
          {
            'firstName': 'Thibaut',
            'lastName': 'Boulard',
          },
          {
            firstName: 'Etienne',
            lastName: 'De Valmont',
          },
          {
            'firstName': 'Benoît',
            'lastName': 'Lefebvre',
          },
        ]
      )
    })
  })

  describe('origin', () => {
    it('should manage four elements', () => {
      const tasks = [
        {
          'firstName': 'Odile',
          'origin': 'Aristaghes',
        },
        {
          'firstName': 'Thibaut',
          'origin': 'Boulard',
        },
        {
          'firstName': 'Benoît',
          'origin': 'Lefebvre',
        },
        {
          'firstName': 'Audrey',
          'origin': 'Boulard',
        },
        {
          firstName: 'Etienne',
          origin: 'De Valmont',
        },
      ]

      // When
      const response = tasksSorter.origin(tasks)

      // Then
      expect(response).toEqual([
          {
            'firstName': 'Odile',
            'origin': 'Aristaghes',
          },
          {
            'firstName': 'Thibaut',
            'origin': 'Boulard',
          },
          {
            'firstName': 'Audrey',
            'origin': 'Boulard',
          },
          {
            firstName: 'Etienne',
            origin: 'De Valmont',
          },
          {
            'firstName': 'Benoît',
            'origin': 'Lefebvre',
          },
        ]
      )
    })
  })

  describe('points', () => {
    it('should manage four elements', () => {
      const tasks = [
        {
          points: 48,
        },
        {
          points: 49,
        },
        {
          points: 47,
        },
        {
          points: 480,
        },
        {
          points: 4,
        },
      ]

      // When
      const response = tasksSorter.points(tasks)

      // Then
      expect(response).toEqual([
          {
            points: 480,
          },
          {
            points: 49,
          },
          {
            points: 48,
          },
          {
            points: 47,
          },
          {
            points: 4,
          },
        ]
      )
    })
  })

  describe('lastDate', () => {
    it('should manage four elements', () => {
      const tasks = [
        {
          'firstName': 'Odile',
          'lastDate': '05/11/2016',
        },
        {
          'firstName': 'Julien',
          'lastDate': '23/03/2016',
        },
        {
          'firstName': 'Benoit',
          'lastDate': '20/11/2015',
        },
        {
          'firstName': 'Audrey',
          'lastDate': '24/01/2016',
        },
      ]

      // When
      const response = tasksSorter.lastDate(tasks)

      // Then
      expect(response).toEqual([
          {
            'firstName': 'Benoit',
            'lastDate': '20/11/2015',
          },
          {
            'firstName': 'Audrey',
            'lastDate': '24/01/2016',
          },
          {
            'firstName': 'Julien',
            'lastDate': '23/03/2016',
          },
          {
            'firstName': 'Odile',
            'lastDate': '05/11/2016',
          },
        ]
      )
    })

    it('should not confused day and month', () => {
      const tasks = [
        {
          'firstName': 'Julien',
          'lastDate': '23/03/2016',
        },

        {
          'firstName': 'Audrey',
          'lastDate': '24/01/2016',
        },
      ]

      // When
      const response = tasksSorter.lastDate(tasks)

      // Then
      expect(response).toEqual([
          { 'firstName': 'Audrey', 'lastDate': '24/01/2016' },
          { 'firstName': 'Julien', 'lastDate': '23/03/2016' },
        ]
      )
    })

    it('should return response data', () => {
      const tasks = [
        {
          'firstName': 'Julien',
          'lastName': 'Michard',
          'lastDate': '23/03/2016',
        },
        {
          'firstName': 'Ibai',
          'lastName': '',
          'lastDate': '',
        },
      ]

      // When
      const response = tasksSorter.lastDate(tasks)

      // Then
      expect(response).toEqual([
          { 'firstName': 'Julien', 'lastName': 'Michard', 'lastDate': '23/03/2016' },
          { 'firstName': 'Ibai', 'lastName': '', 'lastDate': '' },
        ]
      )
    })
  })

  describe('birthday', () => {
    it('should manage four elements', () => {
      const tasks = [
        {
          'firstName': 'Odile',
          'nextBirthday': '05/11/2016',
        },
        {
          'firstName': 'Julien',
          'nextBirthday': '',
        },
        {
          'firstName': 'Benoit',
          'nextBirthday': '20/11/2015',
        },
        {
          'firstName': 'Audrey',
          'nextBirthday': '24/01/2016',
        },
      ]

      // When
      const response = tasksSorter.birthday(tasks)

      // Then
      expect(response).toEqual([
          {
            'firstName': 'Benoit',
            'nextBirthday': '20/11/2015',
          },
          {
            'firstName': 'Audrey',
            'nextBirthday': '24/01/2016',
          },
          {
            'firstName': 'Odile',
            'nextBirthday': '05/11/2016',
          },
          {
            'firstName': 'Julien',
            'nextBirthday': '',
          },
        ]
      )
    })

    it('should not confused day and month', () => {
      const tasks = [
        {
          'firstName': 'Julien',
          'nextBirthday': '23/03/2016',
        },

        {
          'firstName': 'Audrey',
          'nextBirthday': '24/01/2016',
        },
      ]

      // When
      const response = tasksSorter.birthday(tasks)

      // Then
      expect(response).toEqual([
          { 'firstName': 'Audrey', 'nextBirthday': '24/01/2016' },
          { 'firstName': 'Julien', 'nextBirthday': '23/03/2016' },
        ]
      )
    })

    it('should return response data', () => {
      const tasks = [
        {
          'firstName': 'Julien',
          'lastName': 'Michard',
          'nextBirthday': '23/03/2016',
        },
        {
          'firstName': 'Ibai',
          'lastName': '',
          'nextBirthday': '',
        },
      ]

      // When
      const response = tasksSorter.birthday(tasks)

      // Then
      expect(response).toEqual([
          { 'firstName': 'Julien', 'lastName': 'Michard', 'nextBirthday': '23/03/2016' },
          { 'firstName': 'Ibai', 'lastName': '', 'nextBirthday': '' },
        ]
      )
    })
  })
})
