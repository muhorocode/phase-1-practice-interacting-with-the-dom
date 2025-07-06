
//only run when html is opened and ready
document.addEventListener('DOMContentLoaded',()=>{
    //html element counter
    let counter=document.getElementById('counter')
     //add a click event to the pause/minus/heart/add button
    let pauseButton=document.getElementById('pause')
    let minusButton=document.getElementById('minus')
    let plusButton=document.getElementById('plus')
    let heartButton=document.getElementById('heart')
    let submitButton=document.getElementById('submit')
    let list=document.getElementById('list')
    let commentForm=document.getElementById('comment-form')
    let commentInput=document.getElementById('comment-input')
    let likes={}
    let likesList=document.querySelector('.likes')
    // gets the string and converts it to a number
    let count=parseInt(counter.textContent)
    //timer is running
    let ispaused=false
    //starts the timer
    let timer= setInterval(() => {
        //increases by one every time every one second
        count++
        counter.textContent=count
    }, 1000);
       //minus button
     minusButton.addEventListener('click', ()=> {
                count--
                counter.textContent=count
            })
      
      // adds add button
      plusButton.addEventListener('click', ()=>{
        count++
        counter.textContent=count
      })

      heartButton.addEventListener('click', ()=>{
        const currentNumber=count
        //if a number is previously liked. increment
        if(likes[currentNumber]){
            likes[currentNumber]++
            //find the existing like for the current no using its id
            const existingLike=document.getElementById(`like-${currentNumber}`)
            //update the text
            existingLike.textContent=`${currentNumber} has been liked ${likes[currentNumber]} times`

        }else{
            //the first time like
            likes[currentNumber]=1
            //new like element
            const like=document.createElement('li')
            //assign a unique id
            like.id=`like-${currentNumber}`
            //like text
            like.textContent=`${currentNumber} has been liked 1 time`
            //add to the list of likes
            likesList.appendChild(like)
        }
      })
    //add a click event to the pause button
    pauseButton.addEventListener('click', ()=>{
        if(!ispaused){
            //if counter is not paused stop the counter
            clearInterval(timer)
            pauseButton.textContent='resume'
            //paused
            ispaused=true

            minusButton.disabled=true
            plusButton.disabled=true
            heartButton.disabled=true
            submitButton.disabled=true
         //resume timer
        }else{
            timer=setInterval(() => {
                count++
                counter.textContent=count
            }, 1000);

            pauseButton.textContent='pause'
            ispaused=false
            minusButton.disabled=false
            plusButton.disabled=false
            heartButton.disabled=false
            submitButton.disabled=false

        }
    })   
          
         //add event listener and function runs when the user clicks submit
         commentForm.addEventListener('submit', (event)=>{
            //prevents the page from refreshing
            event.preventDefault()
            //prevents blank comments
            const commentText=commentInput.value.trim()
            //if comments not empty
            if(commentText !== ''){
                //creates a new html elemnet in memory
                const commentElement=document.createElement('p')
                commentElement.textContent=commentText
                //adds to the bottom of the list
                list.appendChild(commentElement)
                //clear input
                commentInput.value=''
            }
         })
}) 
