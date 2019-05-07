import reducer, { types2, userLoggedIn, userLoggedOut, clearTrip, setDates, setOriginState } from '../../Redux/reducer';

describe('actions', () => {
    it('should log user in', () => {
       const user = "jackson"
       const expectedAction = {
           type: types2.USER_LOGGED_IN,
           payload: user
       }
       expect(userLoggedIn(user)).toEqual(expectedAction)
    })
    it('should log user out', () => {
        const expectedAction = {
            type: types2.USER_LOGGED_OUT
        }
        expect(userLoggedOut()).toEqual(expectedAction)
    })
    it('should clear trip', () => {
        const expectedAction = {
            type: types2.CLEAR_TRIP
        }
        expect(clearTrip()).toEqual(expectedAction)
    })
    it('should set dates', () => {
        const dates = "01/10/2019"
        const expectedAction = {
            type: types2.SET_DATES,
            payload: dates
        }
        expect(setDates(dates)).toEqual(expectedAction)
    })
    it('should set origin state', () => {
        const originState = "UT"
        const expectedAction = {
            type: types2.SET_ORIGIN_STATE,
            payload: originState
        }
        expect(setOriginState(originState)).toEqual(expectedAction)
    })
})