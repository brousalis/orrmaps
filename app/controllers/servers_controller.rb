class ServersController < ApplicationController
  respond_to :json

  def create
    @server = Server.find_by_name(params[:server])
    session[:server] = @server.name
    if current_user
      @user = current_user
      @user.map.server = @server
      @user.map.save
      @user.server = @server
      @user.save
      current_user = @user
    end
    render :json => { "location" => "/" }
  end

  def show
    name = params[:name].titleize.sub("Of", "of")
    @user = User.new
    @server = Server.find_by_name(name)
    @servers = servers
    fetch_rated_maps!(@server)
  end

  def points
    name = params[:name].titleize.sub("Of", "of") 
    server = Server.where(:name => name).first
    fetch_rated_maps!(server)
    data = server.maps.includes(:points).sort_by { |m| @like_counts[m.id] || 0 }.reverse.collect do |map|
      {:likes => @like_counts[map.id] || 0, :points => map.points.flatten.to_json}
    end
    render :json => data
  end
end
