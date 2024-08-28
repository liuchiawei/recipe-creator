'use client'

import React from 'react'
import PropTypes from 'prop-types'

interface RecipeDetailProps {
    recipe: Recipe
}

function RecipeDetail({ recipe }: RecipeDetailProps) {
    return (
        <div>
            <h2 className="py-5 text-3xl font-bold mb-6 text-center text-gray-800">{recipe.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{recipe.description}</p>
        </div>
    )
}

RecipeDetail.propTypes = {}

export default RecipeDetail
