import terms from './terms';

interface TermsPageProps {
  type: keyof typeof terms;
}

const TermsPage: React.FC<TermsPageProps> = ({ type }) => {
  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe {...terms[type]} style={{ width: '100%', height: '100vh' }} />
  );
};

export default TermsPage;
