class MapsController < ApplicationController
  respond_to :json

  def index
    if current_user
      map = current_user.map
      points = map.points.to_gmaps4rails
      render :json => {:map_id => map.id, :points => points.html_safe}
    end
    render :json => {:points => []} if !current_user
  end

  def map
    map = Map.find(params[:id])
    points = map.points.to_gmaps4rails
    render :json => points
  end

  def show
    @user = User.new
    @server = Server.find_by_name(session[:server]) || Server.find_by_name("Jade Quarry")
    @map = Map.find(params[:id])
    #@rated = Map.find_all_by_server_id(@server.id).collect{|m|{:map=>m,:count=>m.likes.count}}.sort{|a,b| b[:count] <=> a[:count]}
    @rated = Map.find_all_by_server_id(@server.id, :order => "updated_at DESC")
  end

  def update
    map = Map.find(params[:id])
    points = map.points.to_gmaps4rails
    respond_with points
  end

  def like
    map = Map.find_by_id(params[:map_id])
    if current_user && current_user.map != map
      if current_user.already_likes?(map)
        like = map.likes.find_by_user_id(current_user.id)
        like.destroy
        render :json => { "status" => "failure", "count" => map.likes.count }
      else
        like = Like.create(:map => map, :user => current_user)
        if like
          render :json => { "status" => "success", "count" => map.likes.count }
        else
          render :json => { "status" => "failure" }
        end
      end
    else
      render :json => { "status" => "own" }
    end
  end
 

end
