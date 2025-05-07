import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  None = 'none',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSort = (type: SortType) => {
    const sorted = [...goodsFromServer];

    if (type === SortType.Alphabetically) {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (type === SortType.ByLength) {
      sorted.sort((a, b) => a.length - b.length);
    }

    setGoods(isReversed ? [...sorted].reverse() : sorted);
    setSortType(type);
  };

  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const isModified = () => {
    const base = [...goodsFromServer];

    if (sortType === SortType.Alphabetically) {
      base.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.ByLength) {
      base.sort((a, b) => a.length - b.length);
    }

    const finalList = isReversed ? [...base].reverse() : base;

    return JSON.stringify(finalList) !== JSON.stringify(goodsFromServer);
  };

  const getButtonClass = (active: boolean) =>
    `button ${active ? '' : 'is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`is-info ${getButtonClass(sortType === SortType.Alphabetically)}`}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`is-success ${getButtonClass(sortType === SortType.ByLength)}`}
          onClick={() => handleSort(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`is-warning ${getButtonClass(isReversed)}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified() && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
