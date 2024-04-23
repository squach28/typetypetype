const Home = () => {
  return (
    <div className="bg-gray-700 text-white min-h-screen">
      <h1>typetypetype</h1> 
      <div className="flex flex-col justify-center items-center gap-4 my-8">
        <p className="text-2xl font-bold">Compete with your friends to see who truly is the typing master</p>
        <div className="flex gap-8">
          <button className="border p-2 m-1 text-2xl">Create Room</button>
          <button className="border p-2 m-1 text-2xl">Join Room</button>
        </div>
      </div>
    </div>
  )
}

export default Home