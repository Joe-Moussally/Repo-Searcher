import Styles from '../style_modules/Loading.module.css'

function Loading() {
  return (
    <div
        className={Styles.loading_container}
    >

        {/* dot-1 */}
        <div></div>
        {/* dot-2 */}
        <div></div>
        {/* dot-3 */}
        <div></div>

    </div>
  )
}

export default Loading