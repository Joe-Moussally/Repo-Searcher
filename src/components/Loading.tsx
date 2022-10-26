import Styles from '../style_modules/Loading.module.css'

function Loading() {
  return (
    <div
        className={Styles.loading_container}
    >

        {/* dot-1 */}
        <div className={`${Styles.dot_1} ${Styles.dot}`}></div>
        {/* dot-2 */}
        <div className={`${Styles.dot_2} ${Styles.dot}`}></div>
        {/* dot-3 */}
        <div className={`${Styles.dot_3} ${Styles.dot}`}></div>

    </div>
  )
}

export default Loading