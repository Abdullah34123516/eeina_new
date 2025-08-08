import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { TopCreatorsSection } from "../Home/sections/TopCreatorsSection";
import { AdSection } from "../Home/sections/AdSection";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Avatar } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";
import { 
  User,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Settings,
  Edit3,
  Camera,
  Users,
  ChefHat,
  Award,
  Calendar,
  Clock,
  Star,
  MoreHorizontal,
  Send,
  Grid3X3,
  List,
  Filter,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";

export const Profile = (): JSX.Element => {
  const { t, isRTL, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'activity' | 'recipes'>('activity');
  const [newComment, setNewComment] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  // Generate localized path
  const getLocalizedPath = (path: string) => {
    return language === 'ar' ? `/ar${path === '/' ? '' : path}` : path;
  };

  // User profile data
  const userProfile = {
    name: "Adam Ahmed",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    coverImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
    stats: {
      posts: 2,
      followers: 7,
      following: 10
    },
    badges: ["Top Chef", "Recipe Master"],
    joinDate: "January 2023",
    location: "New York, USA"
  };

  // User posts/activity data
  const userPosts = [
    {
      id: 1,
      user: {
        name: "Adam Ahmed",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
        time: "30 mins ago"
      },
      content: "Tastes Amazing. 10/10 Would Recommend",
      image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      likes: 24,
      comments: 8,
      shares: 3,
      saved: false,
      recipe: {
        name: "Fluffy Pancakes with Berries",
        id: 4
      }
    },
    {
      id: 2,
      user: {
        name: "Adam Ahmed",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
        time: "2 hours ago"
      },
      content: "Just tried this amazing pasta recipe! The flavors are incredible 🍝✨",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      likes: 42,
      comments: 15,
      shares: 7,
      saved: true,
      recipe: {
        name: "Creamy Porcini Mushroom Polenta",
        id: 1
      }
    },
    {
      id: 3,
      user: {
        name: "Adam Ahmed",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
        time: "1 day ago"
      },
      content: "Perfect weekend brunch! This recipe never fails to impress my guests 🥞",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      likes: 67,
      comments: 23,
      shares: 12,
      saved: false,
      recipe: {
        name: "Spicy Thai Basil Chicken",
        id: 2
      }
    }
  ];

  // User created recipes
  const userRecipes = [
    {
      id: 101,
      title: "Adam's Special Pancakes",
      image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      cookingTime: "25 min",
      servings: 4,
      difficulty: "Beginner",
      rating: 4.8,
      reviews: 124,
      category: "Breakfast",
      createdDate: "2024-01-10"
    },
    {
      id: 102,
      title: "Mediterranean Fusion Bowl",
      image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      cookingTime: "20 min",
      servings: 2,
      difficulty: "Intermediate",
      rating: 4.6,
      reviews: 89,
      category: "Healthy",
      createdDate: "2024-01-08"
    },
    {
      id: 103,
      title: "Signature Pasta Creation",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      cookingTime: "35 min",
      servings: 3,
      difficulty: "Advanced",
      rating: 4.9,
      reviews: 156,
      category: "Pasta",
      createdDate: "2024-01-05"
    }
  ];

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleSave = (postId: number) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const categories = ['All', 'Breakfast', 'Healthy', 'Pasta'];
  const filteredRecipes = userRecipes.filter(recipe => 
    filterCategory === 'All' || recipe.category === filterCategory
  );

  const PostCard = ({ post }: { post: any }) => (
    <Card className="mb-4 sm:mb-6 hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
              <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover" />
            </Avatar>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{post.user.name}</h4>
              <p className="text-xs sm:text-sm text-gray-500">{post.user.time}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Content */}
        <p className="text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">{post.content}</p>

        {/* Post Image */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-48 sm:h-80 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Recipe Link */}
        {post.recipe && (
          <Link 
            to={`/recipe/${post.recipe.id}`}
            className="inline-flex items-center gap-2 text-[#22ae4b] hover:text-[#1c9a40] font-medium mb-3 sm:mb-4 text-sm sm:text-base"
          >
            <ChefHat className="w-4 h-4" />
            <span>Recipe: {post.recipe.name}</span>
          </Link>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-2 ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
              onClick={() => toggleLike(post.id)}
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
              <span className="text-sm">{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm">{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:text-green-500">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm hidden sm:inline">{post.shares}</span>
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`${savedPosts.includes(post.id) ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'}`}
            onClick={() => toggleSave(post.id)}
          >
            <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${savedPosts.includes(post.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Comment Input */}
        <form onSubmit={handleComment} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-full">
          <Avatar className="w-8 h-8">
            <img src={userProfile.avatar} alt="Your avatar" className="w-full h-full object-cover" />
          </Avatar>
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
          />
          {newComment.trim() && (
            <Button type="submit" size="sm" className="bg-[#22ae4b] hover:bg-[#1c9a40] text-white rounded-full px-3 sm:px-4">
            <Send className="w-4 h-4" />
          </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );

  const RecipeCard = ({ recipe }: { recipe: any }) => (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-32 sm:h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-[#22ae4b] text-white">
                {recipe.category}
              </Badge>
            </div>
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {new Date(recipe.createdDate).toLocaleDateString()}
            </div>
          </div>
          
          <div className="p-3 sm:p-4">
            <h3 className="font-bold text-sm sm:text-lg mb-2 group-hover:text-[#22ae4b] transition-colors line-clamp-2">
              {recipe.title}
            </h3>
            
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{recipe.cookingTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{recipe.servings}</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
                <span className="text-gray-600">({recipe.reviews})</span>
              </div>
              <Button size="sm" variant="outline" className="border-[#22ae4b] text-[#22ae4b] hover:bg-[#22ae4b] hover:text-white text-xs px-2 sm:px-3">
                {t.profile.edit}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredRecipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-0">
              <div className="flex">
                <div className="relative w-32 sm:w-48 h-24 sm:h-32 flex-shrink-0">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#22ae4b] text-white text-xs">
                      {recipe.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 p-3 sm:p-4 flex justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-lg mb-2 group-hover:text-[#22ae4b] transition-colors">
                      {recipe.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{recipe.cookingTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      {t.profile.created} {new Date(recipe.createdDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <div className="flex text-yellow-400">
                        ★★★★★
                      </div>
                      <span className="text-gray-600">({recipe.reviews})</span>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#22ae4b] text-[#22ae4b] hover:bg-[#22ae4b] hover:text-white text-xs px-2 sm:px-3 mt-2">
                      {t.profile.edit}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopCreatorsSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left - Profile Info */}
          <div className="lg:col-span-4 order-1 lg:order-1">
            <Card className="mb-6">
              <CardContent className="p-0">
                {/* Cover Image */}
                <div className="relative h-24 sm:h-32 bg-gradient-to-r from-[#22ae4b] to-[#1c9a40] rounded-t-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/20 hover:bg-white/30 text-white w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="p-4 sm:p-6 -mt-12 sm:-mt-16 relative">
                  <div className="flex items-end justify-between mb-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 sm:w-24 sm:h-24 border-4 border-white shadow-lg">
                        <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                      </Avatar>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#22ae4b] hover:bg-[#1c9a40] text-white rounded-full"
                      >
                        <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="border-[#22ae4b] text-[#22ae4b] hover:bg-[#22ae4b] hover:text-white">
                      <Link to="/edit-profile" className="flex items-center">
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="text-xs sm:text-sm">{language ==='ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}</span>
                      </Link>
                    </Button>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{userProfile.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-[#22ae4b]">{userProfile.stats.posts}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-[#22ae4b]">{userProfile.stats.followers}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-[#22ae4b]">{userProfile.stats.following}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Following</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {userProfile.badges.map((badge, index) => (
                      <Badge key={index} className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                        <Award className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Joined {userProfile.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{userProfile.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to={getLocalizedPath("/create-recipe")}>
                    <Button className="w-full bg-[#22ae4b] hover:bg-[#1c9a40] text-white justify-start text-sm">
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      {t.profile.add_new_recipe}
                    </Button>
                  </Link>
                  <Link to={getLocalizedPath("/account-settings")}>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      {t.profile.account_settings}
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    {t.profile.manage_followers}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-8 order-2 lg:order-2">
            {/* Add New Recipe Card */}
            <Card className="mb-6">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#22ae4b] rounded-full flex items-center justify-center flex-shrink-0">
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">{language ==='ar' ? 'أضف وصفة جديدة' : 'Add new recipe'}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{language === 'ar' ? 'شارك إبداعاتك الطهوية مع المجتمع' :'Share your culinary creations with the community'}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'أدخل عنوان URL للوصفة' : 'Enter Recipe URL'}
                    </label>
                    <Input
                      placeholder="www.youtube.com"
                      className="border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b] text-sm"
                    />
                  </div>
                  <Button className="w-full bg-[#22ae4b] hover:bg-[#1c9a40] text-white text-sm">
                   {language === 'ar' ? 'استيراد الوصفة' : 'Import Recipe'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="flex gap-4 sm:gap-8 mb-6 border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab('activity')}
                className={`pb-4 px-2 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeTab === 'activity'
                    ? 'text-[#22ae4b] border-b-2 border-[#22ae4b]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.profile.latest_activity}
              </button>
              <button
                onClick={() => setActiveTab('recipes')}
                className={`pb-4 px-2 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeTab === 'recipes'
                    ? 'text-[#22ae4b] border-b-2 border-[#22ae4b]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.profile.recipes_created}
              </button>
            </div>

            {/* Recipe Filters and View Toggle */}
            {activeTab === 'recipes' && (
              <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  {/* Category Filter */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={filterCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterCategory(category)}
                        className={filterCategory === category 
                          ? "bg-[#22ae4b] hover:bg-[#1c9a40] text-white text-xs" 
                          : "border-gray-200 hover:border-[#22ae4b] hover:text-[#22ae4b] text-xs"
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' 
                        ? "bg-white shadow-sm" 
                        : "hover:bg-white/50"
                      }
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' 
                        ? "bg-white shadow-sm" 
                        : "hover:bg-white/50"
                      }
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Content based on active tab */}
            {activeTab === 'activity' ? (
              <div>
                {userPosts.slice(0, showAllPosts ? userPosts.length : 2).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
                {userPosts.length > 2 && (
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAllPosts(!showAllPosts)}
                      className="border-[#22ae4b] text-[#22ae4b] hover:bg-[#22ae4b] hover:text-white"
                    >
                      {showAllPosts ? 'Show Less' : `Show All ${userPosts.length} Posts`}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {filteredRecipes.length > 0 ? (
                  viewMode === 'grid' ? <GridView /> : <ListView />
                ) : (
                  <div className="text-center py-12">
                    <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
                    <p className="text-gray-500">
                      {filterCategory !== 'All' 
                        ? `No recipes found in ${filterCategory} category` 
                        : "Create your first recipe to see it here"
                      }
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {activeTab === 'activity' && userPosts.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{t.profile.no_activity}</h3>
                <p className="text-gray-500">{language === 'ar' ? 'ابدأ بمشاركة الوصفات والتفاعل مع المجتمع!' : 'Start sharing recipes and interacting with the community!'}</p>
              </div>
            )}

            {activeTab === 'recipes' && filteredRecipes.length === 0 && filterCategory === 'All' && (
              <div className="text-center py-12">
                <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{t.profile.no_recipes}</h3>
                <p className="text-gray-500">{language === 'ar' ? 'أنشئ وصفتك الأولى وشاركها مع العالم!' : 'Create your first recipe and share it with the world!'}</p>
                <Link to={getLocalizedPath("/create-recipe")}>
                  <Button className="bg-[#22ae4b] hover:bg-[#1c9a40] text-white mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    {t.profile.create_first_recipe}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Advertisement (Hidden on mobile) */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 hidden 2xl:block">
          <Card className="bg-gradient-to-br from-[#22ae4b] to-[#1c9a40] rounded-2xl border-0 h-96 overflow-hidden">
            <CardContent className="p-0 h-full relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
                <div className="text-white text-6xl font-extrabold mb-4 opacity-90">
                  AD
                </div>
                <div className="text-white text-lg font-semibold mb-2">
                  Your Brand Here
                </div>
                <div className="text-white/80 text-sm">
                  Reach thousands of food enthusiasts
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AdSection />
    </div>
  );
};