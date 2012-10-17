class HomeController < ApplicationController
  def index
    @user = User.new unless current_user
    @map = Map.new unless current_user

    @server = Server.find_by_name(session[:server]) if session[:server]
    @server = Server.find_by_name("Jade Quarry") if !session[:server]
    session[:server] = @server.name if !session[:server]

    @rated = Map.find_all_by_server_id(@server.id).collect{|m|{:map=>m,:count=>m.likes.count}}.sort{|a,b| b[:count] <=> a[:count]}

    if current_user
      if !current_user.map
        map = Map.new(:user => current_user, :server => @server)
        map.save
        @map = map

        user = current_user
        user.map = map
        user.save
      end
      @map = current_user.map
    end
  end
end
