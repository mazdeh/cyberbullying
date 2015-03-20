// var data = [
//   {author: "Pete Hunt", text: "This is one comment"},
//   {author: "Jordan Walke", text: "This is *another* comment"}
// ];

var Page = React.createClass({
  
  handleSubmition: function(question1, question2) {
    var data = {num: this.state.num, question1: question1, question2: question2}
    $.ajax({
      url: "results.json",
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        this.setState({num: this.state.num+1, data:this.state.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  getInitialState: function(){
    return {num: 0, data:[]};
  },

  componentDidMount: function(){
    $.ajax({
      url: "cyberbullying_data.json",
      dataType: 'json',
      success: function(data) {
      
        this.setState({num: this.state.num, data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    console.log("Page num: " + this.state.num)
    if(this.state.data){
      var indData = this.state.data[this.state.num]
      if(indData){
      
    return (
      <div className="page">
        <h1>Page #{this.state.num +1}</h1>
        <QuestionForm onQuestionSubmit={this.handleSubmition} />
        <table>
        <tr>
        <td className="imageCell">
        <h1> Image </h1>
        <img src={indData.image_url}/>
        </td>
        <td>
        <h2> Comments </h2>
        <CommentList data={indData}/>
        </td>
        </tr>
        </table>
      </div>
    );
  } else {
     return (
      <div className="page">
        <h1>Thank you for time the survey is finished!</h1>
      
      </div>
    );
  }
  }
  else {
    return (
      <div className="page">
        <h1>Loading...</h1>
      
      </div>
    );
  }
  }
});

// tutorial2.js
var pageContent = React.createClass({
  render: function() {
  	var commentNodes = this.props.data.map(function (comment) {
  		return (
	  		<Comment author={comment.author}>
	  			{comment.text}
	  		</Comment>
  		);
  	});
  		return (
  			<div className="commentList">
  				{commentNodes}
  			</div>
  			)
}
});

var QuestionForm = React.createClass({
	handleSubmit: function(e) {
    e.preventDefault();
    // var author = this.refs.author.getDOMNode().value.trim();
    var question1 =  0
    if(this.refs.question1.getDOMNode().checked)
      question1 = 1
    
    var question2 = 0
    if(this.refs.question2.getDOMNode().checked)
        question2 = 1

    this.refs.question1.getDOMNode().checked = false
    this.refs.question2.getDOMNode().checked = false
    this.refs.question1a.getDOMNode().checked = false
    this.refs.question2a.getDOMNode().checked = false
    this.props.onQuestionSubmit(question1, question2);
    // this.refs.text.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form className="onQuestionSubmit" onSubmit={this.handleSubmit}>
        <p>Is there any cyberaggressive behavior in the online posts? Mark yes if there is at least one negative word/comment and or content with intent to harm someone or others. </p>
         <input type="radio" name="question1" value="Yes" ref="question1" required/>Yes
        <input type="radio" name="question1" value="No" ref="question1a"/>No
           <p>Is there any cyerbullying in the online post? Mark yes if there are negative words and or comment with intent to harm someone or other, and the posts include two or more repeated negativity against a victim that cannot easily defend him or herself</p>
         <input type="radio" name="question2" value="Yes" ref="question2" required/>Yes
        <input type="radio" name="question2" value="No" ref="question2a"/>No
        <p></p>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var converter = new Showdown.converter();
var Comment = React.createClass({
	render: function() {
		var rawMarkup = converter.makeHtml(this.props.children.toString());
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
			);
	}
});

var CommentList = React.createClass({
  render: function() {
    var i = 1;
    var formatData = [];
    while(true){
      var text = this.props.data["comment_" + i]
      if(text == " ")
          break;
      var user = this.props.data["user_id_" +i]
      var time = this.props.data["creation_time_" + i]
      formatData[i -1] = ({text:{text}, user:{user}, time:{time}})
      i = i +1;
    }
    var commentNodes = formatData.map(function (comment) {
      return (
        <div className="comment">
        <h4> User: {comment.user} </h4>
        <p> Comment: {comment.text} </p>
        <h6> {comment.time} </h6>
      </div>
      );
    });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
        )
}});


React.render(
  <Page />,
  document.getElementById('content')
);