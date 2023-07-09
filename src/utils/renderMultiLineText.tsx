import { Fragment } from 'react';

export default function renderMultiLineText(
  text: string,
  seperator: string = '\n',
) {
  const sentences = text.split(seperator);
  return (
    <>
      {sentences.map((sentence, idx) => {
        return (
          <Fragment key={idx}>
            {sentence}
            {idx !== sentences.length - 1 && <br />}
          </Fragment>
        );
      })}
    </>
  );
}
