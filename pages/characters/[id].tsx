import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import imageLoader from '../../imageLoader';
import { Character } from '../../types';
import styles from '../../styles/Home.module.css';

function CharacterPage({ character }: { character: Character }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1>{character.name}</h1>
      <Image
        loader={imageLoader}
        unoptimized
        src={character.image}
        alt={character.name}
        width='200px'
        height='200px'
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );
  const character = await res.json();
  console.log(character);
  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
