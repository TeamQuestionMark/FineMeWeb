import {
  Body1,
  Body2,
  Body3,
  Body4,
  Caption,
  Display,
  Headline1,
  Headline2,
  Subhead1,
  Subhead2,
} from '@/components/Typography';

const TypographyPage = () => {
  return (
    <div className="App">
      <Display>Display</Display>
      <Headline2>Headline2</Headline2>
      <Headline1>Headline1</Headline1>
      <Subhead2>Subhead2</Subhead2>
      <Subhead1>Subhead1</Subhead1>
      <Body4 color="textPrimary">Body4</Body4>
      <Body3 color="textDisable">Body3</Body3>
      <Body2 color="textDisableAccent">Body2</Body2>
      <Body1>Body1</Body1>
      <Caption element="label">Caption</Caption>
    </div>
  );
};

export default TypographyPage;
