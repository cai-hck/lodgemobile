import { StyleSheet } from 'react-native';

export default style = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 10,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: .3,
    borderColor: '#edf',
    zIndex: 1,
  },
  row: {
    flexDirection: 'row'
  },
  nameRow: {
    flexDirection: 'row'
  },
  name: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  content: {
    paddingTop: 6,
    paddingBottom: 3,
    paddingRight: 60,
  },
  date: {
    color: 'rgb(100,100,100)',
    fontStyle: 'italic'
  },
  optionsButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    height: 25,
    width: 25,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#edf',
    alignItems: 'center',
    justifyContent: 'center'
  },
  commentOptionsButton: {
    position: 'absolute',
    right: 5,
    top: 10,
    height: 25,
    width: 25,
    borderRadius: 4,
    borderWidth: 0,
    borderColor: '#edf',
    alignItems: 'center',
    justifyContent: 'center'
  },
  options: {
    position: 'absolute',
    top: 5,
    right: 50,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
    justifyContent: 'space-between',
    zIndex: 100
  },
  commentOptions: {
    position: 'absolute',
    top: 3,
    right: 45,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
    justifyContent: 'center',
    zIndex: 100
  },
  optionText: {
    backgroundColor: "#fff",
    padding: 6,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#edf',
  },
  replyContainer: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10
  },
  replyBtn: {
    backgroundColor: '#eee',
    height: 30,
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  likeBtn: {
    backgroundColor: '#ecf0f1',
    height: 30,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  commentLikeBtn: {
    backgroundColor: '#ecf0f1',
    height: 30,
    width: 50,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  likeText: {
    color: '#2c3e50'
  },
  commentLikeText: {
    marginTop: 5,
    color: '#2c3e50'
  },
  replyBox: {
    marginTop: -9,
    minHeight: 60,
    maxHeight: 300,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center', 
    paddingLeft: 20
  },
  replyTxtBox: {
    minHeight: 50,
    maxHeight: 150,
    width: '70%',
    paddingLeft: 10,
    backgroundColor: '#eee',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    borderWidth: .2,
    borderColor: '#010',
  },
  replyPost: {
    marginLeft: 10,
    height: 50,
    width: 70,
    backgroundColor: '#5573e9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .1,
  },
  replyPostTxt: {
    color: 'white',
    fontSize: 20
  },
  commentCell: {
    marginTop: -20,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0,
    borderColor: '#004',
    marginBottom: 10,
  },
  commentTitle: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 0,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  commentContainer: {
    backgroundColor: '#fff',
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    borderWidth: .3,
    borderTopColor: '#edf',
    borderBottomColor: '#edf',
    borderLeftWidth: 0
  },
  commentReplyContainer: {
  },
  editInput: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#eee",
    height: 60,
    width: '70%'
  },
  updateButtons: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    marginTop: 10
  },
  commentUpdateButtons: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
})
