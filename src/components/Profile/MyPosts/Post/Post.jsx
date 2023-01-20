import classes from './Post.module.css'


function Post(props) {
	return (
		<div className={classes.item}>
			<img src="https://steamuserimages-a.akamaihd.net/ugc/1859423535644353766/C07CD27FD9C75DA8A73D88DFE1738415993B4D26/?imw=512&amp;imh=586&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true" alt="#" />
			{props.message}
			<div>
				<span>{props.likesCount} likes</span>
			</div>
		</div>
	)
}

export default Post
