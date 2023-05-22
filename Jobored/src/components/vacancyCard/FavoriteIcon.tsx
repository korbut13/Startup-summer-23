import { Star } from '../star/_star';
import { PaintedStar } from '../star/_paintedStar';

export default function FavoriteIcon({
  favoriteVacancies,
  idVacancy,
}: {
  favoriteVacancies: number[];
  idVacancy: number;
}) {
  if (favoriteVacancies.includes(idVacancy)) {
    return <PaintedStar />;
  } else return <Star />;
}
