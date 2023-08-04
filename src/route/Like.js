import { useState } from 'react';
import './style/Like.scss'

function Like() {

    let [isExist, setIsExist] = useState(false)
    
    return (
        <div className='myLike'>
            <div className='header'>
              <h1>찜한 상품 (0)</h1>
            </div>
            <div className='likebody'>
                {
                    isExist == true
                    ? <div> 상품있다 </div>
                    : <div> 상품없다 </div>
                }
            </div>
        </div>
    )
}

export default Like;