const previousImageTypes = {
    display: 'previousImage - display',
    hide: 'previousImage - hide',
}

const initialStore = {
    previousImage: false
}

const previousImageReducer = (state, action) => {
    switch(action.type) {
        case previousImageTypes.display:
            return {
                previousImage: true
            }
        case previousImageTypes.hide:
            return {
                previousImage: false
            }
        default:
            return state;
    }
}

export { initialStore, previousImageTypes }
export default previousImageReducer
