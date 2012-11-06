class MapsController < ApplicationController
  respond_to :json

  def index
    if current_user
      map = current_user.map
      points = Point.includes(:note).where(:map_id => map.id)
      data = points.collect { |point| point.to_hash }.to_json
      render :json => {:map_id => map.id, :points => data}
    end
    render :json => {:points => []} if !current_user
  end

  def map
    points = Point.includes(:note).where(:map_id => params[:id])
    data = points.collect { |point| point.to_hash }.to_json
    render :json => data
  end

  def show
    @server = find_server(session[:server] || "Jade Quarry")
    @map = Map.find(params[:id])
    @servers = servers
  end

  def update
    map = Map.find(params[:id])
    points = map.points.to_gmaps4rails
    render :json => points
  end

  def dislike
    map = Map.find_by_id(params[:map_id])
    if current_user && current_user.map != map
      if map.already_likes?(current_user)
        map.unlike(current_user)
        render :json => { "status" => "success", "count" => map.likes }
      else
        map.dislike(current_user)
        render :json => { "status" => "success", "count" => map.likes }
      end
    else
      render :json => { "status" => "own" }
    end 
  end

  def like
    map = Map.find_by_id(params[:map_id])
    if current_user && current_user.map != map
      if map.already_likes?(current_user)
        map.unlike(current_user)
        render :json => { "status" => "success", "count" => map.likes }
      else
        map.like(current_user)
        render :json => { "status" => "success", "count" => map.likes }
      end
    else
      render :json => { "status" => "own" }
    end
  end
 

end
