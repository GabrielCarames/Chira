import { memo } from 'react'
import EmojiPicker from 'emoji-picker-react';

const EmojisPicker = memo((({chosenEmoji, setChosenEmoji }) => {

    const onEmojiClick = (event, emojiObject) => {
        if(chosenEmoji) {
            const inputValueEmoji = chosenEmoji + emojiObject.emoji
            setChosenEmoji(inputValueEmoji)
        } else setChosenEmoji(emojiObject.emoji)
      };

    return (
        <EmojiPicker onEmojiClick={onEmojiClick} />
    )
}))

export default EmojisPicker