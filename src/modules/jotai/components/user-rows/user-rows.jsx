import React, { useRef, useLayoutEffect } from 'react';
import { useAtom } from 'jotai';
import { UserRow } from './user-row/user-row';
import { userRowIdsAtom } from '../../atoms/user-rows';
import { showRows } from './animations';
import { useUpdateAtom } from 'jotai/utils';
import { correctionStatusAtom } from '../../atoms/correct-numbers';
import { correctionStatus } from '../../constants';

export const UserRows = () => {
	const [rowIds] = useAtom(userRowIdsAtom);
	const setCorrectionStatus = useUpdateAtom(correctionStatusAtom);
	const ref = useRef();

	useLayoutEffect(() => {
		const tl = showRows({ 
			el: ref.current, 
			onComplete: () => {
				tl.revert();
				setCorrectionStatus(correctionStatus.readyToStart);
			}
		});
	}, [setCorrectionStatus]);

	return (
		<ul ref={ref} className='user-rows'>
			{rowIds.map((rowId) => (
				<UserRow key={rowId} rowId={rowId} />
			))}
	</ul>
	);
};
