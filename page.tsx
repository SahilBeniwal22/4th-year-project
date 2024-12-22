import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LibraryPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">My Library</h1>
      <Tabs defaultValue="playlists" className="w-full">
        <TabsList>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
        </TabsList>
        <TabsContent value="playlists">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                <img src={`/images/playlist-${i}.jpg`} alt={`Playlist ${i}`} className="w-full aspect-square object-cover rounded-lg mb-4" />
                <h3 className="font-semibold">Playlist {i}</h3>
                <p className="text-sm text-gray-400">{Math.floor(Math.random() * 50) + 10} songs</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="albums">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                <img src={`/images/album-${i}.jpg`} alt={`Album ${i}`} className="w-full aspect-square object-cover rounded-lg mb-4" />
                <h3 className="font-semibold">Album Title {i}</h3>
                <p className="text-sm text-gray-400">Artist Name</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="artists">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                <img src={`/images/artist-${i}.jpg`} alt={`Artist ${i}`} className="w-full aspect-square object-cover rounded-lg mb-4" />
                <h3 className="font-semibold">Artist Name {i}</h3>
                <p className="text-sm text-gray-400">{Math.floor(Math.random() * 10) + 1} albums</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

