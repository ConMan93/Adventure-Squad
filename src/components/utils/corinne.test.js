import reducer, { types, displayUsers, setOriginCity } from '../../Redux/reducer'

describe('actions', () => {
    it('should handle update discussion board', () => {
       const discussion = "hello"
       const expectedAction = {
           type: types.UPDATE_DISCUSSION_BOARD,
           payload: discussion
       }
       expect(reducer({}, expectedAction)).toEqual({ discussion })
    })
    it('should handle update friends', () => {
        const friends = "max"
        const expectedAction = {
            type: types.SET_FRIENDS,
            payload: friends
        }
        expect(reducer({}, expectedAction)).toEqual({friends})
    })
    it('should create an action to display users', () => {
        const allUsers = "max"
        const expectedAction = {
            type: types.DISPLAY_USERS,
            payload: allUsers
        }
        expect(displayUsers(allUsers)).toEqual(expectedAction)
    })
    it('should create an action to set origin city', () => {
        const city = "Salt Lake City"
        const expectedAction = {
            type: types.SET_ORIGIN_CITY,
            payload: city
        }
        expect(setOriginCity(city)).toEqual(expectedAction)
    })
    it('should handle add member to trip', () => {
        const tripMembers = "corinnen"
        const expectedAction = {
            type: types.SET_MEMBERS,
            payload: tripMembers
        }
        expect(reducer({}, expectedAction)).toEqual({tripMembers})
    })
})