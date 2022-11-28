import React, { useEffect } from 'react'
import stl from './style.module.less'
import Lottie, { Options } from 'react-lottie'
import registLo from './static/regist_lo.json'
const Regist = () => {
	const Opetions: Options = {
		loop: true,
		autoplay: true,
		animationData: registLo,
	}
	return (
		<div className={stl.regist}>
			<div className={stl.content}>
				<div>
					<Lottie options={Opetions} width={200} height={200}></Lottie>
				</div>
			</div>
		</div>
	)
}

export default Regist
