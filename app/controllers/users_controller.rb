class UsersController < ApplicationController
  def update
    current_user.update_attributes(params[:user])
    current_user.save
  end

  def create
    @user = User.find_by_name(params[:user][:name])
    if @user
      if @user.authenticate(params[:user][:name], params[:user][:password])
        session[:user_id] = @user.id
        render :json => {:location => '/'}
      else
        render :json => {:errors => @user.errors.full_messages.join(', ')}
      end
    else
      user = User.new(params[:user])
      if user.save
        session[:user_id] = user.id
        render :json => {:location => '/'}
      else
        render :json => {:errors => user.errors.full_messages.join(', ')}
      end
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end 
end
